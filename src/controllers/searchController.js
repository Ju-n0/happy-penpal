const { prismaClient } = require("../database");

const searchController = {
  async index(req, res) {
    const countries = await prismaClient.country.findMany();
    res.render("search", { countries });
  },

  async getProfiles(req, res) {
    const { gender, country, minAge, maxAge, hasPicture, hasPresentation } = req.body;

    const searchedCountry = await prismaClient.country.findUnique({
      where: {
        name: country,
      },
    });

    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - maxAge);
    startDate.setMonth(0);
    startDate.setDate(1);

    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() - minAge);
    endDate.setMonth(11);
    endDate.setDate(31);

    console.log({
      gender: gender,
      countryId: searchedCountry.id,
      birthdate: {
        gte: startDate,
        lte: endDate,
      },
    });

    const whereParams = {
      gender: gender,
      countryId: searchedCountry.id,
      birthdate: {
        gte: startDate,
        lte: endDate,
      },
    };

    if (hasPicture) whereParams.picture = { not: null };
    if (hasPresentation) whereParams.presentation = { not: null };

    const profiles = await prismaClient.user.findMany({
      where: whereParams,
    });

    const countries = await prismaClient.country.findMany();

    res.render("search", { profiles, ...req.body, countries });
  },
};

module.exports = searchController;
