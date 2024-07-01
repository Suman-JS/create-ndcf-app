export const validateGithubRegistryUsernameUsername = (
  input: string
): boolean => {
  const prefix = "ghcr.io/";
  const maxLength = 20;

  if (input.startsWith(prefix)) {
    const username = input.substring(prefix.length).split("/")[0];
    if (username) {
      return username.length > 0 && username.length <= maxLength;
    }
  }
  return false;
};
