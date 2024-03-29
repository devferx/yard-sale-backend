const CategoryService = require('./../services/category.service');
const { checkRolesGql } = require('../utils/checkRolesGql');
const { checkJwtGql } = require('../utils/checkJwtGql');

const service = new CategoryService();

const getCategory = async (_, { id }) => service.findOne(id);

const addCategory = async (_, { dto }, context) => {
  const user = await checkJwtGql(context);

  checkRolesGql(user, 'admin', 'customer');

  return service.create({
    ...dto,
    image: dto.image.href,
  });
};

module.exports = {
  getCategory,
  addCategory,
};
