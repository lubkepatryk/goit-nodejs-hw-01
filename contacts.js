const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const readContacts = () => {
  return fs.promises
    .readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data));
};

const writeContacts = (contacts) => {
  return fs.promises.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

module.exports = {
  readContacts,
  writeContacts,
};

async function listContacts() {
  try {
    const contacts = await readContacts();
    console.log("Contacts:");
    contacts.forEach((contact) => {
      console.log(
        `- ${contact.name}, email: ${contact.email}, phone: ${contact.phone}`
      );
    });
  } catch (error) {
    console.error("Error reading contacts:", error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await readContacts();
    const contact = contacts.find((c) => c.id === contactId);
    if (!contact) {
      console.log("Contact not found");
    } else {
      console.log("Contact:");
      console.log(`- Name: ${contact.name}`);
      console.log(`- Email: ${contact.email}`);
      console.log(`- Phone: ${contact.phone}`);
    }
  } catch (error) {
    console.error("Error reading contacts:", error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await readContacts();
    const updatedContacts = contacts.filter((c) => c.id !== contactId);
    await writeContacts(updatedContacts);
    console.log("Contact removed successfully");
  } catch (error) {
    console.error("Error removing contact:", error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await readContacts();
    const newContact = { id: Date.now().toString(), name, email, phone };
    const updatedContacts = [...contacts, newContact];
    await writeContacts(updatedContacts);
    console.log("Contact added successfully");
  } catch (error) {
    console.error("Error adding contact:", error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};