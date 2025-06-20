export const stringToSearch = (string, searchTerm) => {
  return string.toLowerCase().includes(searchTerm.toLowerCase().trim());
};
