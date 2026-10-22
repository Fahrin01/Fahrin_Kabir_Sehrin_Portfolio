# Adding Project Images

Each project card on the site has an image area. Until you add a screenshot, the card shows a violet placeholder with the project name. Adding an image needs **no code changes**: drop the file in the right folder with the right name.

## 1. Take the screenshots

- **Shape:** landscape, 16:10 ratio (for example **1280 × 800** px). Other sizes still work, but they get cropped to fit, keeping the top of the image.
- **Content:** the most impressive screen of the app, such as the dashboard, the map, or the chat view. Hide any real personal data (names, phone numbers, emails) before capturing.
- **Mobile apps** (e.g. the Flutter chat app): put one or two phone screenshots side by side on a plain background in Canva and export at 1280 × 800.
- **Desktop apps** (e.g. the Tkinter bill calculator): a window screenshot on a plain background works well.

## 2. Make the files small

Aim for **under 200 KB per image**, so the site stays fast.

1. Open <https://squoosh.app> in your browser.
2. Drag in the screenshot.
3. On the right, choose **WebP** and set quality to about **75**.
4. If it's larger than 1280 px wide, tick **Resize** and set width to **1280**.
5. Click **Download**.

## 3. Name and place the files

Put the images in **`public/projects/`** using exactly these names:

| Project | File name |
|---|---|
| AreaFix BD | `areafix-bd.webp` |
| CourseMate BD | `coursemate-bd.webp` |
| BUA.COM | `bua-com.webp` |
| Real-Time Chat App | `chat-app.webp` |
| LifeDrop | `lifedrop.webp` |
| Bangladesh Electricity Bill Calculator | `bill-calculator.webp` |

You can add them one at a time; projects without an image keep the placeholder.

**Using `.png` or `.jpg` instead of `.webp`?** Open `src/data/projects.js`, find that project's `image:` line, and change the extension to match, e.g.
`image: '/projects/lifedrop.png',`

## 4. Check it

```bash
npm run dev
```

Open the address it prints (usually <http://localhost:5173>) and scroll to **Projects**. If a card still shows the placeholder:

- Check the file is directly inside `public/projects/` (not a subfolder).
- Check the name matches exactly, including lowercase letters and the extension (Windows may hide extensions: in File Explorer, turn on **View → Show → File name extensions**).

## 5. Publish it

Once the site is on Vercel, commit the new images and push to GitHub. Vercel rebuilds the site automatically.

```bash
git add public/projects
git commit -m "Add project screenshots"
git push
```

## Adding GitHub / live demo links later

In `src/data/projects.js`, fill in the empty fields for a project:

```js
github: 'https://github.com/Fahrin01/areafix-bd',
demo: 'https://areafix-bd.vercel.app',
```

The **Code** and **Live demo** buttons appear on that card automatically. Leave a field as `''` to keep its button hidden.
