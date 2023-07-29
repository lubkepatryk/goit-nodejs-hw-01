const contacts = require('./contacts');
const { listContacts, getContactById, removeContact, addContact } = require('./contacts');

listContacts();

const contactId = 'rsKkOQUi80UsgVPCcLZZW'
getContactById(contactId);

removeContact(contactId);

const newContact = { name: 'John Doe', email: 'john.doe@example.com', phone: '123 456 789' };
addContact(newContact.name, newContact.email, newContact.phone);