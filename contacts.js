const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join('./db/contacts.json');

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf-8');
    return await JSON.parse(contacts);
  } catch (error) {
    console.log(error.message);
    return;
  }
}
  
  async function getContactById(contactId){
    try{
      const contacts = await listContacts();     
      const contact = await contacts.find((contact) => {
        return Number(contact.id) === Number(contactId);
      });      
      return await contact;
    } catch (error) {
      console.log(error.message);
      return;
    }
  };

  async function findMaxId() {
    try {
      const contacts = await listContacts();
      const arrayId = contacts.map(contact => Number(contact.id));
      console.log(arrayId);
      const maxId = Math.max(...arrayId) + 1;
      maxIdStr = maxId.toString();
      console.log(maxIdStr);
      return maxIdStr;
    } catch (error) {
      console.log(error.message);
      return;
    }
  }
  

  async function addContact(name, email, phone) {
    try {
      const contacts = await listContacts();
      const newContacts = JSON.stringify(
        [...contacts, { id: await findMaxId(), name: name, email: email, phone: phone}],
        null,
        2
      );
      await fs.writeFile(contactsPath, newContacts);
      return newContacts;
    } catch (error) {
      console.log(error.message);
      return;
    }

  }

  async function removeContact(contactId) {
    try {
      const contacts = await listContacts();
      const newContacts = contacts.filter((contact) => {
        return Number(contact.id) !== Number(contactId);
      });
      await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
      return newContacts;
    } catch (error) {
      console.log(error.message);
      return;
    }
  }
  

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  findMaxId
};



