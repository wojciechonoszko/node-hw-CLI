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

  const findMaxId = async () => {
    try {
      const contacts = await listContacts();
      const arrayId = contacts.map(contact => contact.id);
      const maxId = Math.max(...arrayId);
      return maxId;
    } catch (error) {
      throw error;
    }
  }
  
  const addContact = async () => {
    const newContact = {...data, id: (await findMaxId()) + 1};

    try {
      const contacts = await listContacts();
      const newContacts = JSON.stringify([...contacts, newContact]);
      await fs.writeFile(contactsPath, newContacts);
      return newContacts;
    } catch (error) {
      throw error;
    }
  };

module.exports = contactsPath;
module.exports = listContacts;
module.exports = getContactById;
module.exports = removeContact;
module.exports = findMaxId;
module.exports = addContact;


