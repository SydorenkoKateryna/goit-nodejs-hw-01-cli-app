const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// return an array of contacts
async function listContacts() {
  const data = await fs.readFile(contactsPath);

  return JSON.parse(data);
}

// return a contact object or null if no contact with this id is found
async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);

  return result || null;
}

// return the added contact object
async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
}

// return the updated contact object or null if no contact with this id is found
async function updateContactById(id, name, email, phone) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);

  if (index === -1) {
    return null;
  }

  contacts[index] = { id, name, email, phone };

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contacts[index];
}

// return the deleted contact object or null if no contact with this id is found
async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return result;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContact,
};
