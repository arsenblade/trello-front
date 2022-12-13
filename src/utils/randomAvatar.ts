const randomIcons = ['icon-user-blue-white', 'icon-user-blue', 'icon-user-hacker', 'icon-user-hockey-mask', 'icon-user-vampire']

export const getRandomAvatar = () => {
  const randomIndex = Math.floor(Math.random() * (4 - 0 + 1) + 0)
  return randomIcons[randomIndex]
}