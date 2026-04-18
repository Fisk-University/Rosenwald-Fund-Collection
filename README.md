# Rosenwald Fund Collection Theme

A custom [Omeka S](https://omeka.org/s/) theme developed for the Fisk University Rosenwald Project. This theme is designed to provide a visually accessible, archivist-friendly interface for exploring digitized materials related to Julius Rosenwald’s philanthropic impact on African-American education.

> **Project Repo:** https://github.com/Fisk-University/Rosenwald-Fund-Collection

---

## 📆 Project Overview

The **Rosenwald Fund Collection** theme was created as part of a Mellon Foundation-funded digital humanities initiative. It provides a tailored, elegant frontend for institutions using Omeka S to display archival content, particularly HBCUs and similar cultural heritage organizations seeking to replicate Fisk University's digital infrastructure.

This theme emphasizes:
- Readable, modern design principles
- Support for dual-filter metadata search (e.g., State and County)
- Lightweight performance
- Seamless integration with selected modules

---

## 🔧 Installation

To install this theme:

1. Download the theme ZIP or clone it directly:
   ```bash
   git clone https://github.com/Fisk-University/Rosenwald-Fund-Collection.git
   ```

2. Move the folder into your Omeka S `themes` directory:
   ```bash
   mv Rosenwald-Fund-Collection /path/to/omeka-s/themes/
   ```

3. Log in to the Omeka S admin panel
4. Go to **Appearance > Theme** and activate "Rosenwald Fund Collection"

---

## 🌈 Features

- **Metadata-first layout** optimized for archival clarity
- **Dynamic page header and item display blocks**
- **Support for dual-property dropdown filters** when paired with the appropriate search module
- **Customized block layouts** including featured item carousels, image/text blocks, and full-width media display
- **Accessibility and responsive design** principles throughout

---

## 📊 Configuration Options

From the Omeka S admin panel:

- Choose custom logos and background images
- Toggle item metadata display fields
- Set homepage blocks using drag-and-drop site builder

No command-line configuration is required. Advanced users can modify CSS or template logic by editing:

- `asset/css/style.css`
- `view/omeka/site/*`
- `theme.ini`

---

## 🚀 Recommended Modules

For full functionality, install the following modules alongside this theme:

- [UnitedSearch](https://github.com/Fisk-University/UnitedSearch) – for dual-property search functionality (e.g., State/County)
- [ZipImport](https://github.com/Fisk-University/ZipImport) – for batch CSV+ZIP archival ingestion
- [Mapping](https://omeka.org/s/modules/Mapping/) – for geolocation display
- [ItemCarouselBlock](https://omeka.org/s/modules/ItemCarouselBlock/) – for featured exhibits and scrolling highlights
- [AnyCloud](https://omeka.org/s/modules/AnyCloud/) – for connecting S3 cloud media storage

---

## 🔍 Folder Structure

```
Rosenwald-Fund-Collection/
├── asset/
│   ├── css/
│   ├── fonts/
│   └── img/
├── view/
│   └── omeka/
│       └── site/
│           ├── item/
│           ├── page/
│           └── browse/
├── theme.ini
└── README.md
```

---

## 📄 License

This module is published under the [Server Side Public License (SSPL-1.0)](https://www.mongodb.com/legal/licensing/server-side-public-license).

---

Built with ❤️ by LaTaevia Berry & Sai Kiran Boppana for Fisk University and HBCUs nationwide

---

## 🚧 Future Improvements

- Add color scheme configuration via admin UI
- Improve mobile responsiveness for tablets
- Expand layout templates for exhibits and tours
- Localize text for multilingual accessibility

We welcome community feedback and contributions.
