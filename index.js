const contacts = require('./contacts')

//contacts.contactsPath;
// contacts.listContacts();
// contacts.getContactById(22);
// contacts.removeContact();
// contacts.addContact();

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

// TODO: refaktor
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      contacts.listContacts().then((data) => console.table(data));
      break;

    case 'get':
      contacts.getContactById(id).then((data) => console.log(data));
      break;

    case 'add':
      contacts
        .addContact(name, email, phone)
        .then((data) => console.table(JSON.parse(data)));
      break;

    case 'remove':
      contacts.removeContact(id).then((data) => console.table(data));
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);