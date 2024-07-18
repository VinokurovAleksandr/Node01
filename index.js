const contacts = require("./contacts.js");
const { program } = require('commander');

// const { Command } = require('commander');
// const program = new Command();



const invokeAction = async({action, id, name, email, phone}) => {
    switch(action){
        case "list":
            const allContacts = await contacts.listContacts();
            console.table(allContacts);
            break;
        case "get":
            const oneContacts = await contacts.getContactById(id);
            console.table(oneContacts);
            break;
        case "add":
            const newContacts = await contacts.addContact(name, email, phone);
            console.table(newContacts);
            break;
        case "updateById":
            const updateContacts = await contacts.updateById(id, email, name, phone)
            console.table(updateContacts);
            break;
        case "remove":
            const removeContactById = await contacts.removeContact(id);
            console.table(removeContactById);
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();
invokeAction(argv)

// invokeAction({action: "list"});
// invokeAction({action: "get", id:"qdggE76Jtbfd9eWJHrssH"})
// invokeAction({action: "add", name:"Makr Twen", email: "www@mark.com", phone: "+380930000000"});
// invokeAction({action: "remove", id:"xR5_UIRc7_fXUoyo85MQ2"});