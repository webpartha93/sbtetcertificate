# Certificates Folder

Place all certificate image files in this folder.

## Naming Convention
Name each image file using the registration number with slashes (`/`) replaced by underscores (`_`).

### Example:
| Registration No | File Name           |
|-----------------|---------------------|
| 0033/26/11      | 0033_26_11.jpg      |
| 0045/27/12      | 0045_27_12.jpg      |

## Supported Formats
- `.jpg` / `.jpeg` — Recommended
- `.png`
- `.webp`

## How to add a new student
1. Copy the certificate image into this folder using the naming convention above.
2. Open `script.js` in the root folder.
3. Add a new entry to the `STUDENTS` array:

```js
{
  name: "STUDENT FULL NAME",
  regNo: "0045/27/12",
  certificatePath: "certificates/0045_27_12.jpg",
  certNo: "DCN XXXXXX",
  course: "Course Name"
}
```

4. Save and refresh the browser. Done!
