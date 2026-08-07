# Calculator Component

## Features:

- Support for addition, subtraction, multiplication, division, exponents, square roots, decimals
- Robust error handling for unintended actions
- Handled several edgecases such as division by 0, operands/results not being a number, result being too many digits or being larger than JavaScript's Max Safe Integer
- A history section for all your past expressions, and a button to clear them all

## Future Features:

- Support more than one operand/2 operands
- Handle percentages

## Usage

- Click a number button to get started
- Adding a decimal followed by an operator will reassign it to the operator
- CE clears screen back to 0
- 0 can not be the first operand
- Only whole numbers can currently be rooted, and that edgecase is currently improperly handled
- If something goes wrong, there'll be either a warning or error in the browser console

## Technologies used:

- **HTML**
- **CSS**
- **JavaScript**
- **Git Bash** (for project management)
- **VS Code** (for codebase management)
- **GitHub** (for storing repository and hosting)

**Installation Instructions**

1. Video demonstration at [Google Drive]()

2. Visit a live version at [Github Pages]()

3. Alternatively, Clone the repository using the following command:
   ```bash
   git clone https://github.com/Jacob-FullStackDev/book-tracker.git
   ```

## Credits

"A (more) Modern CSS Reset" by Andy Bell
Source: https://piccalil.li/blog/a-more-modern-css-reset/
Licensed under CC BY 3.0
https://creativecommons.org/licenses/by/3.0/
Modified: removed comments and unused element selectors.

## Footnotes

- To multiply numbers, I originally wanted to use an algorithm I made to multiply numbers in my head faster, however it is slower than the current approach and it wouldn't be consistent with how the other results are calculated so I did not add it, I instead decided to put it in a GitHub Gist if you are interested: [Github Gists](https://gist.github.com/Jacob-FullStackDev/732819044e44296e5561c87e7b17b111)
