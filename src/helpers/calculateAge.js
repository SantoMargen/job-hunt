const calculateAge = (dateOfBirth) => {
    const dobParts = dateOfBirth.split('/');
    const day = parseInt(dobParts[0]);
    const month = parseInt(dobParts[1]);
    const year = parseInt(dobParts[2]);

    const today = new Date();
    const birthDate = new Date(year, month, day);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    return age;
}

module.exports = calculateAge