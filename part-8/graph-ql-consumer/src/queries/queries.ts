import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  #gql
  query allAuthors {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  #gql
  query allBooks {
    allBooks {
      author
      genres
      id
      published
      title
    }
  }
`;
