# 🦀 Tauri App Generator

This tool lets you instantly turn any **React/Vite/Next webapp** (with a build folder) into a **native Tauri desktop app** — with your own icon, name, and version.

---

## ⚙️ How It Works

The script automatically:

1. Creates a new Tauri project.
2. Copies your webapp build into it.
3. Sets your icon, name, and version.
4. Prepares everything to build your `.exe`.

---

## 📂 Folder Setup

Place all these **in one folder**:

```
📦 my-app-setup/
├── build/            # your webapp build output
├── icon.ico          # your app icon
├── config.json       # app info
└── tauri-app-generator.js
```

---

## 🧾 config.json Format

```
{
  "appName": "MyCoolApp",
  "version": "1.0.0"
}
```

---

## 🚀 Usage

Run this in your terminal:

```
node tauri-app-generator.js
```

Then:

```
cd MyCoolApp
npm run tauri build
```

Your generated **.exe** will appear in:

```
MyCoolApp/src-tauri/target/release/
```

---

## 🧠 Notes

- You must have **Node.js**, **npm**, and **Tauri CLI** installed.
- Works with any web framework (React, Vue, Svelte, etc.) as long as you have a `build/` folder.
- If you want to rebuild with new assets, just replace the `build/` folder and `icon.ico` and rerun the script.

---

## 🧩 Example Output

```
✅ Done! Your Tauri app project "MyCoolApp" is ready.

Next steps:
  cd MyCoolApp
  npm run tauri build
```

---

### 💡 Tip

To make it globally runnable:

```
npm install -g .
```

Then you can run:

```
tauri-gen
```

---

Made with ❤️ using Node + Tauri.
