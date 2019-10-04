// import { GraphQLScalarType } from 'graphql';
// import { Kind } from 'graphql/language';
const graphql = require("graphql");
const { GraphQLScalarType, Kind } = graphql;

const date = new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return new Date(value); // value from the client
        },
        serialize(value) {
            return value.getTime(); // value sent to the client
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return new Date(ast.value) // ast value is always in string format
            }
            return null;
        },
});

// export { date as default };
module.exports = date;