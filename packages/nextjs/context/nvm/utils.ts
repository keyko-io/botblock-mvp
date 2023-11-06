import { MetaData } from "@nevermined-io/sdk";

const metadata: Partial<MetaData> = {
  main: {
    name: "TEST asset",
    type: "dataset",
    dateCreated: "2012-10-10T17:00:00Z",
    datePublished: "2012-10-10T17:00:00Z",
    author: "Met Office",
    license: "CC-BY",
    files: [
      {
        index: 0,
        contentType: "application/json",
        url: "https://storage.googleapis.com/nvm-static-assets/files/ci/ddo-example.json",
      },
      {
        index: 1,
        contentType: "text/plain",
        url: "https://storage.googleapis.com/nvm-static-assets/files/ci/README.md",
      },
    ],
  },
  additionalInformation: {
    description: "Weather information of UK including temperature and humidity",
    copyrightHolder: "Met Office",
    workExample: "423432fsd,51.509865,-0.118092,2011-01-01T10:55:11+00:00,7.2,68",
    links: [
      {
        name: "Sample of Asset Data",
        type: "sample",
        url: "https://foo.com/sample.csv",
      },
      {
        name: "Data Format Definition",
        type: "format",
        url: "https://foo.com/sample.csv",
      },
    ],
    inLanguage: "en",
    categories: ["Economy", "Data Science"],
    tags: ["weather", "uk", "2011", "temperature", "humidity"],
  },
};
const generateMetadata = (name: string, nonce: string | number = Math.random()): Partial<MetaData> => ({
  ...metadata,
  main: {
    ...metadata.main,
    name,
    ...({ nonce } as any),
  },
  additionalInformation: {
    ...metadata.additionalInformation,
  },
});

export const getMetadata = (nonce: string | number = Math.random(), name = "TestAsset"): MetaData =>
  generateMetadata(name, nonce) as MetaData;
