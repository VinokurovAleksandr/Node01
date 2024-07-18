const fs = require("fs/promises");
const path = require("path");

// необхідна версія  3.3.4 
const { nanoid } = require ('nanoid'); 




 const contactsPath = path.join(__dirname, "db/contacts.json");
 const updateContacts = async (contacts) => {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
 }

// TODO: задокументировать каждую функцию
async function listContacts()  {
    //Возвращает массив контактов.
    const allContacts = await fs.readFile(contactsPath)
    return JSON.parse(allContacts);
}
  
async function getContactById(id) {
//  Возвращает объект контакта с таким id. Возвращает null если объект с таким id не найден.
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === id);
    if(!result) {
        return null;
    };
    return result;
}

async function removeContact(id) {
// Возвращает объект удаленного контакта. Возвращает null если объект с таким id не найден.
    const contacts = await listContacts();
    const idx = contacts.findIndex(index => index.id === id);
    if (idx === -1){ 
        return null;
    };
    const [removeContactById] = contacts.splice(idx, 1);
    await updateContacts(contacts);
    return removeContactById;
}

async function addContact(name, email, phone) {
// Возвращает null если объект с таким id не найден.

    // чекаємо всі контакти 
    const contacts = await listContacts();
    // масив  контакту
    const newContacts ={ 
        name,
        email,
        phone,
        // генеруємо ІД за зопомогою nanoid
        id: nanoid(), 
    };
    // добавляємо книгу 
    contacts.push(newContacts);
    // перезаписуємо весь json fs.writeFile(contactsPath - який файл перезаписати , JSON.stringify() - на що перезаписати  )
    await updateContacts(contacts);
    return newContacts;
}

async function updateById(id, email, name, phone){
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === id);
    if(idx === -1){
        return null;
    };
    contacts[idx] = {id,email, name, phone};
    await updateContacts(contacts);
    return contacts[idx];
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateById
};