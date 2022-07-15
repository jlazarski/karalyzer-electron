const fs = window.deps?.fs
const path = window.deps?.path

let files = window.deps?.files

btnAddFile = document.getElementById('addFileButton')
fileContents = document.getElementById('fileContents')
songTable = document.getElementById('songTableBody')
editButtons = document.getElementsByClassName('edit-button')

// Connents to the Files folder we have created for storing files
let pathName = path?.join(window.deps.__dirname, 'files')

console.log('pathName: ', pathName)

const ALLOWED_FILETYPES = ['image/png','image/jpeg', 'audio/mp3', 'audio/x-cdg']

btnAddFile.addEventListener('click', async function() {
    fileContents.click()
})

fileContents.addEventListener('input', function(event) {
    const contents = Array.from(event.target.files)
    console.log('contents: ', contents)
    if (contents.length > 0) {
        Array.from(contents).filter(file => ALLOWED_FILETYPES.indexOf(file.type) >= 0).forEach(file => {
            songTable.innerHTML = songTable.innerHTML + `
              <tr>
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">${file.name}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${file.path}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${file.size}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${file.type}</td>
                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                  <a href="#" data-filename="${file.name}" data-filepath="${file.path}" data-filesize="${file.size}" data-filetype="${file.type}" class="edit-button text-indigo-600 hover:text-indigo-900">Edit<span class="sr-only">, ${file.name}</span></a>
                </td>
              </tr>`
        })
        Array.from(document.getElementsByClassName('edit-button')).forEach(editButton => {
            editButton.addEventListener('click', function(event) {
                console.log('Target: ', event.target)
            })
        })
    }
})

// btnRead.addEventListener('click', function () {
//     let file = path.join(pathName, fileName.value)
//     console.log('Reading File: ', file)
//     fs.readFile(file, function (err, data) {
//         if (err) {
//             return console.log(err)
//         }
//         fileContents.value = data
//         console.log("The file was read")
//     });
// });
// btnDelete.addEventListener('click', function () {
//     let file = path.join(pathName, fileName.value)
//     console.log('Deleting File: ', file)
//     fs.unlink(file, function (err) {
//         if (err) {
//             return console.log(err)
//         }
//         fileName.value = ''
//         fileContents.value = ''
//         console.log("The file was deleted!")
//     });
// });