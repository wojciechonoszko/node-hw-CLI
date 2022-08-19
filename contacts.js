const fs = require('fs').promises;
const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async () => {
    try {
      const data = await fs.readFile(contactsPath);
      const contacts = JSON.parse(data);
      return contacts;
    } catch (error) {
      throw error;
    }
  };
  
  const getContactById = async id => {
    try {
      const contacts = await listContacts();
      const contact = contacts.find(contact => contact.id === id);
      if (!contact){
        throw new Error(`Contact with id=${id} doesn't exist.`);
      }
      return contact;
    } catch (error) {
      throw error;
    }
  }
  
  const removeContact = async id => {
    try{
      const contacts = await listContacts();
      const index = contacts.findIndex(contact => contact.id === id);

      if (index === -1) {
        throw new Error(`Contact with id=${id} doesn't exist.`);
      }
      const newContacts = contacts.filter(contact => contact.id !== id);

      const contactsToString = JSON.stringify(newContacts);
      await fs.writeFile(contactsPath, contactsToString);

      return contacts[index];
    } catch (error) {
      throw error;
    }
  };
  
  function addContact(name, email, phone) {
    // ...twój kod
  }

module.exports = contactsPath;
module.exports = listContacts;
module.exports = getContactById;
module.exports = removeContact;

