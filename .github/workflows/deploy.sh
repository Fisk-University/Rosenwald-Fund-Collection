#!/bin/bash
set -e

ENV=$1
TAG=$2

# Hardcoded values
THEME_NAME="Rosenwald-Fund-Collection"
S3_BUCKET="rw.rosenwald-ci-cd-logs-backups"

DATE=$(date +"%Y%m%d_%H%M%S")
LOG_DIR="/tmp/theme-logs"
BACKUP_DIR="/tmp/theme-backups/omeka-themes-${ENV}-${DATE}"
ARTIFACT_PATH="/var/www/html/omeka-s/themes/$THEME_NAME"

mkdir -p "$LOG_DIR" "$BACKUP_DIR"
LOG_FILE="${LOG_DIR}/${THEME_NAME}_${TAG}.log"

echo "[INFO] Starting theme deployment: $THEME_NAME ($TAG) → $ENV" | tee "$LOG_FILE"
echo "[INFO] Backing up $ARTIFACT_PATH to $BACKUP_DIR" | tee -a "$LOG_FILE"

# Backup current theme
cp -r "$ARTIFACT_PATH" "$BACKUP_DIR/${THEME_NAME}_preupdate" 2>/dev/null || {
  echo "[WARN] No existing theme to back up." | tee -a "$LOG_FILE"
}

# Deploy
DEPLOY_SRC="/tmp/deployed-theme"
if [ -d "$DEPLOY_SRC" ]; then
  rsync -av "$DEPLOY_SRC/" "$ARTIFACT_PATH/" >> "$LOG_FILE" || {
    echo "[ERROR] Deployment failed. Rsync error." | tee -a "$LOG_FILE"
    exit 1
  }
else
  echo "[ERROR] Source folder $DEPLOY_SRC does not exist." | tee -a "$LOG_FILE"
  exit 1
fi

# Cleanup temp
echo "[INFO] Cleaning up..." | tee -a "$LOG_FILE"
rm -rf /tmp/theme-artifact.zip "$DEPLOY_SRC"

# Upload to S3
echo "[INFO] Uploading to S3: logs + backup" | tee -a "$LOG_FILE"
aws s3 cp --recursive "$BACKUP_DIR/${THEME_NAME}_preupdate/" \
  "s3://${S3_BUCKET}/${ENV}/backups/themes/${THEME_NAME}_${TAG}/" || \
  echo "[WARN] Backup upload to S3 failed" | tee -a "$LOG_FILE"

aws s3 cp "$LOG_FILE" \
  "s3://${S3_BUCKET}/${ENV}/logs/themes/${THEME_NAME}_${TAG}.log" || \
  echo "[WARN] Log upload to S3 failed" | tee -a "$LOG_FILE"

echo "[SUCCESS] Deployment complete for $THEME_NAME ($TAG)" | tee -a "$LOG_FILE"
