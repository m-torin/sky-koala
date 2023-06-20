'use client';

import {ArrowForwardIcon, CheckIcon} from '@chakra-ui/icons';
import {
  Box,
  Code,
  Container,
  Heading,
  Link,
  List,
  ListIcon,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from '@chakra-ui/react';

export const Assumptions = () => (
  <Container mb={50}>
    <Heading as="h1" mb={5} size="xl">
      Findings & Assumptions
    </Heading>

    <Text fontSize="md" mb={5}>
      Reviewing the `mock_application.json` file revealed a complex API schema which
      shows signs of stress from rapid feature set growth. With a limited
      understanding of the <em>why</em> things are in specific places, I made the
      following assumptions:
    </Text>

    <List spacing={3}>
      <ListItem>
        <ListIcon as={CheckIcon} color="black.300" />
        <Code colorScheme="orange">Objects</Code> should be deduplicated on{' '}
        <Code colorScheme="green">Key</Code>.
      </ListItem>
      <ListItem>
        <ListIcon as={CheckIcon} color="black.300" />
        Its the <Code colorScheme="orange">Views</Code> within each{' '}
        <Code colorScheme="orange">Scene</Code> that should be deduplicated on{' '}
        <Code colorScheme="green">Key</Code>, which represents recursive actions.
      </ListItem>
      <ListItem>
        <ListIcon as={ArrowForwardIcon} color="red.500" />
        Other fields likely could also serve as deduplication identifiers. The code
        solutions put forth here easily accommodate additional points.
      </ListItem>
    </List>
  </Container>
);

export const Codebase = () => (
  <Container mb={50}>
    <Heading as="h1" mb={5} size="xl">
      Codebase
    </Heading>

    <Box mb={5}>
      <Text>
        This repository is a Yarn 3 Workspace + Turborepo monorepo. It contains
        support for things liek Centralized eslint, prettier configs, and types. This
        structure can quickly be extended to balance microservice architecture with
        monorepo convenience.
      </Text>
    </Box>

    <Box>
      <Heading as="h2" mb={2} size="md">
        File Structure
      </Heading>
      <List spacing={2}>
        <ListItem>
          <Code>/__tests__</Code> - Business logic and API handler unit tests.
        </ListItem>

        <ListItem>
          <Code>/app</Code> - Next.js App Router for React 18
          <List ml={30}>
            <ListItem>
              <Code>/api</Code> - Three endpoints which process/transform data and an
              endpoint for unit testing via <Code>Jest CI</Code>.
            </ListItem>
            <ListItem>
              {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
              <Code>/*</Code> - Code used for this apps UI.
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Code>/public</Code> - Serve <Code>mock_application.json</Code> via the web
          server.
        </ListItem>
        <ListItem>
          <Code>/types</Code> - Project-specific shared types.
        </ListItem>
        <ListItem>
          <Code>/ui</Code> - React 18 Client components.
        </ListItem>
        <ListItem>
          <Code>/utils</Code> - Business logic functions.
        </ListItem>
      </List>
    </Box>
  </Container>
);

export const Verification = () => (
  <Container mb={50}>
    <Heading as="h1" mb={5} size="xl">
      Solution Verification
    </Heading>

    <OrderedList spacing={3}>
      <ListItem>
        <List>
          <ListItem>
            Verify{' '}
            <Link color={'blue.500'} href="/api/mock">
              mock data endpoint
            </Link>{' '}
            returns under <Code>data: {`{}`}</Code>.
          </ListItem>
          <ListItem>
            You can also filter just{' '}
            <Link color={'blue.500'} href="/api/mock?filter=objects">
              Objects
            </Link>{' '}
            or{' '}
            <Link color={'blue.500'} href="/api/mock?filter=scenes">
              Scenes
            </Link>
            .
          </ListItem>
        </List>
      </ListItem>

      <ListItem>
        Verify{' '}
        <Link color={'blue.500'} href="/api/deduplicate">
          deduplicate endpoint
        </Link>{' '}
        returns obecjts and scenes with the subresponse of:{' '}
        <Code>**: {`{dedupCount: 1, source: {}, appData: {}, remvoed: {}`}</Code>.
      </ListItem>

      <ListItem>
        Verify{' '}
        <Link color={'blue.500'} href="/api/appData">
          appData endpoint
        </Link>{' '}
        returns a mock data feed with deduplicated objects removed. You can also
        filter just{' '}
        <Link color={'blue.500'} href="/api/appData?filter=objects">
          Objects
        </Link>{' '}
        or{' '}
        <Link color={'blue.500'} href="/api/appData?filter=scenes">
          Scenes
        </Link>
        .<br />
        For Scenes the deduplicated id is <Code>id: 61e86a5d1137bc002545ff11</Code>.
        <br />
        This endpoint creates{' '}
        <Link color={'blue.500'} href="/clean_application.json">
          clean_application.json
        </Link>
        .<br />
        <Text fontWeight={700} mt={2}>
          Note: the <em>appData</em> endpoint is not configured for Vercel/cloud
          hosting. This demo app was originally intended to be shared via repo zip
          and ran locally, however there were issues with the applicant tracking
          system accepting my code. The{' '}
          <Link color={'blue.500'} href="/clean_application.json">
            output
          </Link>{' '}
          is checked in. <em>Future Work</em> entry added.
        </Text>
      </ListItem>

      <ListItem>
        Verify{' '}
        <Link color={'blue.500'} href="/api/jest">
          Jest CI endpoint
        </Link>{' '}
        passes all unit tests.{' '}
        <Text fontWeight={700}>
          Not currently working on Vercel, see <em>Future Work</em>. Use locally.
        </Text>
      </ListItem>
    </OrderedList>
  </Container>
);

export const Future = () => (
  <Container mb={50}>
    <Heading as="h1" mb={5} size="xl">
      Future Work
    </Heading>
    <UnorderedList spacing={3}>
      <ListItem>
        Save the clean_application.json in a way that works in Vercel, which would be
        cloud storage.
      </ListItem>
      <ListItem>
        Workaround for Jest CI on Vercel; module is installed.{' '}
        <Code color={'red.500'}>
          error Error: Cannot find module &apos;jest-environment-node&apos;
        </Code>
        .
      </ListItem>
      <ListItem>Extend deduplication to consider other identifiers</ListItem>
      <ListItem>
        Add Typescript Type checks to the Object and Scene endpoints.
      </ListItem>
      <ListItem>Fix css background flashing on page load.</ListItem>
    </UnorderedList>
  </Container>
);
