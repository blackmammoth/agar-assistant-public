"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n } from "@/i18n.config";
import { Select, SelectItem } from "@tremor/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

function LocaleSwitcher() {
  const pathName = usePathname();
  const router = useRouter();

  const redirectedPathName = (locale) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const langDictionary = {
    1: "en",
    2: "am",
    3: "om",
  };

  const handleChange = (newValue) => {
    const selectedLanguage = langDictionary[newValue];
    setSelectValue(newValue);  // Update state first
    router.push(redirectedPathName(selectedLanguage));
  };

  const [selectValue, setSelectValue] = useState("1");

  const LanguageDropdown = () => {
    return (
      <Select
        placeholder="Select Language"
        onValueChange={(newValue) => {
          const selectedLanguage = langDictionary[newValue];
          setSelectValue(newValue);  // Update state first
          router.push(redirectedPathName(selectedLanguage));
        }}
        value={selectValue}
        className="z-20"
      >
        <SelectItem value="1">English</SelectItem>
        <SelectItem value="2">Amharic</SelectItem>
        <SelectItem value="3">Afaan Oromo</SelectItem>
      </Select>
    );
  };

  return (
    <div>
      <LanguageDropdown />
    </div>
  );
}

module.exports = LocaleSwitcher;
