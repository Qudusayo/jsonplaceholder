const axios = require("axios");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLBoolean,
} = require("graphql");

const CommentType = new GraphQLObjectType({
    name: "Comment",
    description: "Post commennt Information",
    fields: () => ({
        postId: { type: GraphQLInt },
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        body: { type: GraphQLString },
    }),
});

const AlbumType = new GraphQLObjectType({
    name: "Album",
    description: "Album Information",
    fields: () => ({
        userId: { type: GraphQLInt },
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
    }),
});

const PostType = new GraphQLObjectType({
    name: "Post",
    description: "Posts Information",
    fields: () => ({
        userId: { type: GraphQLInt },
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
    }),
});

const UserType = new GraphQLObjectType({
    name: "User",
    description: "User Information",
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        address: { type: Address },
        phone: { type: GraphQLString },
        website: { type: GraphQLString },
        company: { type: Company },
    }),
});

const Address = new GraphQLObjectType({
    name: "Address",
    description: "User Address Information",
    fields: () => ({
        street: { type: GraphQLString },
        suite: { type: GraphQLString },
        city: { type: GraphQLString },
        zipcode: { type: GraphQLString },
        geo: { type: Geolocation },
    }),
});

const Geolocation = new GraphQLObjectType({
    name: "Geo",
    description: "User geolocation Information",
    fields: () => ({
        lat: { type: GraphQLString },
        lng: { type: GraphQLString },
    }),
});

const Company = new GraphQLObjectType({
    name: "Company",
    description: "User company Information",
    fields: () => ({
        name: { type: GraphQLString },
        catchPhrase: { type: GraphQLString },
        bs: { type: GraphQLString },
    }),
});

const TodoType = new GraphQLObjectType({
    name: "Todo",
    description: "User todo Information",
    fields: () => ({
        userId: { type: GraphQLInt },
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        completed: { type: GraphQLBoolean },
    }),
});

const PhotoType = new GraphQLObjectType({
    name: "Photo",
    description: "Photo Information",
    fields: () => ({
        albumId: { type: GraphQLInt },
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        url: { type: GraphQLString },
        thumbnailUrl: { type: GraphQLString },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    description: "Root query for any Information",
    fields: () => ({
        comments: {
            type: new GraphQLList(CommentType),
            description: "All user comments",
            resolve(parent, args) {
                return axios
                    .get("https://jsonplaceholder.typicode.com/comments")
                    .then((res) => res.data);
            },
        },
        comment: {
            type: CommentType,
            description: "Single user comment by ID",
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parent, args) {
                return axios
                    .get(`https://jsonplaceholder.typicode.com/comments/${args.id}`)
                    .then((res) => res.data);
            },
        },
        albums: {
            type: new GraphQLList(AlbumType),
            description: "All albums",
            resolve(parent, args) {
                return axios
                    .get("https://jsonplaceholder.typicode.com/albums")
                    .then((res) => res.data);
            },
        },
        album: {
            type: AlbumType,
            description: "Single album by ID",
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parent, args) {
                return axios
                    .get(`https://jsonplaceholder.typicode.com/albums/${args.id}`)
                    .then((res) => res.data);
            },
        },
        posts: {
            type: new GraphQLList(PostType),
            description: "All posts",
            resolve(parent, args) {
                return axios
                    .get("https://jsonplaceholder.typicode.com/posts")
                    .then((res) => res.data);
            },
        },
        post: {
            type: PostType,
            description: "Single post by ID",
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parent, args) {
                return axios
                    .get(`https://jsonplaceholder.typicode.com/posts/${args.id}`)
                    .then((res) => res.data);
            },
        },
        users: {
            type: new GraphQLList(UserType),
            description: "All users",
            resolve(parent, args) {
                return axios
                    .get("https://jsonplaceholder.typicode.com/users")
                    .then((res) => res.data);
            },
        },
        user: {
            type: UserType,
            description: "Single user by ID",
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parent, args) {
                return axios
                    .get(`https://jsonplaceholder.typicode.com/users/${args.id}`)
                    .then((res) => res.data);
            },
        },
        todos: {
            type: new GraphQLList(TodoType),
            description: "All todos",
            resolve(parent, args) {
                return axios
                    .get("https://jsonplaceholder.typicode.com/todos")
                    .then((res) => res.data);
            },
        },
        todo: {
            type: TodoType,
            description: "Single todo by ID",
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parent, args) {
                return axios
                    .get(`https://jsonplaceholder.typicode.com/todos/${args.id}`)
                    .then((res) => res.data);
            },
        },
        photos: {
            type: new GraphQLList(PhotoType),
            description: "All photos",
            resolve(parent, args) {
                return axios
                    .get("https://jsonplaceholder.typicode.com/photos")
                    .then((res) => res.data);
            },
        },
        photo: {
            type: PhotoType,
            description: "Single photo by ID",
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parent, args) {
                return axios
                    .get(`https://jsonplaceholder.typicode.com/photos/${args.id}`)
                    .then((res) => res.data);
            },
        },
    }),
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    description: "Jsonplaceholder fake restful API GraphQL query"
});
