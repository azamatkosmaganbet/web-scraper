"use client";
import { scrapeAndStoreProduct } from "@/lib/actions";
import React, { FormEvent, useState } from "react";

const isValidTechnodomProductUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;
    console.log(hostname);

    if (
      hostname.includes("sulpak.kz") ||
      hostname.includes("sulpak") ||
      hostname.includes("sulpak.")
    ) {
      return true;
    }
  } catch (e) {
    return false;
  }
};

const SearchBar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchPrompt, setSearchPrompt] = useState("");
  
  const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValidLink = isValidTechnodomProductUrl(searchPrompt);

    if (!isValidLink) return alert("Please provide a valid Amazon link");

    try {
      setIsLoading(true);
      const product = await scrapeAndStoreProduct(searchPrompt);

    }catch(e) {

    }finally {
      setIsLoading(false);
    }
  };
  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        placeholder="Enter product link"
        className="searchbar-input"
      />

      <button
        type="submit"
        className="searchbar-btn"
        disabled={searchPrompt === ""}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default SearchBar;
