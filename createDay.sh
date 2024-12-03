# !/bin/bash

# ------------------------------------------
# run 
# '. ./createDay.sh <year> <day number>' 
# example:
# '. ./createDay.sh 2023 15'
# in root repo directory
# ------------------------------------------

# Check if the correct number of arguments is provided
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <existing_folder> <new_folder_name>"
    exit 1
fi

existing_folder="$1"
new_day="$2"
new_folder_name="day-$2"
new_folder_path="$existing_folder/$new_folder_name"

# Check if the existing folder exists
if [ ! -d "$existing_folder" ]; then
    echo "Error: The existing folder '$existing_folder' does not exist."

    read isAccepted -p "Create '$existing_folder' as a new folder? (Y/n)"
    if [ "${isAccepted,,}" = "y*" ]; then
      mkdir -p "$existing_folder"
    fi
    
    exit 1
fi

# Create the new folder inside the existing one
mkdir -p "$new_folder_path"

# Change directory to the new folder
cd "$new_folder_path" || exit

# Run pnpm init and pnpm i ts-node
pnpm init
pnpm i ts-node

# Add a script to package.json for launching index.ts with --esm using "pnpm dev"
npm pkg set 'license'='MIT'
npm pkg set 'scripts.dev'='ts-node index.ts --esm'
npm pkg delete 'scripts.test'

# create necessary files
gitignore node VisualStudio
echo '// TODO solve the AoC challenge of the day
import fs from '\''fs'\''
import splitNewLine from '\''../../utils/splitNewLine'\''

// -----------------
const isDemo = true
// -----------------

let input: string[] = []
try {
	isDemo
		? (input = splitNewLine(fs.readFileSync('\''demoInput.txt'\'').toString()))
		: (input = splitNewLine(fs.readFileSync('\''input.txt'\'').toString()))
} catch (error) {
	console.error('\''error reading input file\n'\'', error)
}
' > index.ts
echo '# Thinking' > THINKING.md
touch input.txt
touch demoInput.txt
# touch README.md

echo "TypeScript setup completed successfully in '$new_folder_path'."
