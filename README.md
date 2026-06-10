# ⚡ DSA Visualizer

An interactive visualizer for sorting and searching algorithms with step-by-step pseudocode highlighting.

## 🔴 Live Demo
👉 [View Live](https://dsa-visualizer-beta-sepia.vercel.app/)

## 🧠 Algorithms Included

| Algorithm | Type | Time Complexity |
|-----------|------|----------------|
| Bubble Sort | Sorting | O(n²) |
| Selection Sort | Sorting | O(n²) |
| Merge Sort | Sorting | O(n log n) |
| Quick Sort | Sorting | O(n log n) avg |
| Binary Search | Searching | O(log n) |

## ✨ Features

- Step-by-step animation with Play / Pause / Reset controls
- Previous and Next step buttons for manual stepping
- Speed control slider
- **Pseudocode panel** — highlights the exact line executing at each step
- Color coded bars — yellow = comparing, red = swapping, green = sorted, purple = pivot
- Algorithm statistics — comparisons, swaps, progress
- Binary Search target input

## 🚀 How to Run Locally

```bash
git clone https://github.com/Gunjan-Yadav12/-dsa-visualizer.git
cd dsa-visualizer
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## 🛠 Tech Stack

React · Vite · CSS · JavaScript

## 📁 Project Structure

    dsa-visualizer/
    ├── src/
    │   ├── algorithms/       ← pure JS, no React (bubbleSort, mergeSort etc.)
    │   ├── components/       ← React components (Visualizer, Controls etc.)
    │   ├── hooks/            ← custom hooks
    │   ├── App.jsx           ← root component, owns all state
    │   └── App.css
    └── index.html

## 🎨 Color Guide

| Color | Meaning |
|-------|---------|
| 🟡 Yellow | Currently comparing |
| 🔴 Red | Currently swapping |
| 🟢 Green | Sorted / found |
| 🟣 Purple | Pivot element |
| 🔵 Blue | Default |