import { Flex, Grid } from "@chakra-ui/react"
import axios from "axios"
import ListingCard from "../components/ListingCard"
import type { NextPage } from "next"
import Head from "next/head"
import React, { useEffect, useState } from "react"

const Listings: NextPage = () => {
  const [listings, setListings] = useState<any[]>([])

  useEffect(() => {
    axios.get<{ listings: any[] }>("/api/listings").then((r) => {
      console.log(r)
      setListings(r.data.listings)
    })
  }, [])

  return (
    <Flex h="100vh" direction="column" w="100%">
      <Head>
        <title>See all listings in your area</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {listings && <ListingsGrid listings={listings} />}
    </Flex>
  )
}

const ListingsGrid = (props: { listings: any[] }) => {
  return (
    <Grid
      templateColumns="repeat(auto-fit, minmax(250px, 1fr));"
      gap={6}
      p={6}
      w="100%"
    >
      {props.listings.map((listing) => (
        <ListingCard key={listing._id} listing={listing} />
      ))}
    </Grid>
  )
}

export default Listings