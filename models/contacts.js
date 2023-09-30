const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const searchedId = contacts.find((contact) => contact.id === contactId);
    return searchedId || null;
}

const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const deletedIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (deletedIndex === -1) {
      return null;
    }
    const [deletedContact] = contacts.splice(deletedIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return deletedContact;
}

const addContact = async (body) => {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      ...body,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

const updateContact = async (contactId, body) => {
    const contacts = await listContacts();
    const updatedIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (updatedIndex === -1) {
      return null;
    }
    contacts[updatedIndex]={contactId, ...body};
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[updatedIndex];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
