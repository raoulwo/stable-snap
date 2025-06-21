import type {FocusedImage} from "@/lib/types/focused-image.ts";
import type {SearchResult} from "@/lib/types";
import {createContext, useContext, useEffect, useState} from "react";
import { searchInitialImages, searchImages } from '@/lib/api';

type AppContextType = {
    isLoadingImages: boolean;
    setIsLoadingImages: (isLoading: boolean) => void;
    focusedImage: FocusedImage;
    setFocusedImage: (newImage: FocusedImage) => void;
    resetFocusedImage: () => void;
    searchResults: SearchResult[];
    setSearchResults: (newResults: SearchResult[]) => void;
    searchTags: Set<string>;
    setSearchTags: (newSearchTags: Set<string>) => void;
    handleQuerySearchOfImages: (query: string) => Promise<void>;
};

const AppContext = createContext<AppContextType | null>(null);

const AppProvider = ({children}: {children: React.ReactNode}) => {
    const [isLoadingImages, setIsLoadingImages] = useState<boolean>(true);
    const [focusedImage, setFocusedImage] = useState<FocusedImage>({ imageURL: "", imageId: "" });
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [searchTags, setSearchTags] = useState<Set<string>>(new Set<string>);

    useEffect(() => {
        initialFetchOfImages();
    }, []);

    const initialFetchOfImages = async () => {
        try {
            const results: {imageResults: SearchResult[]; imageTags: Set<string>} = await searchInitialImages();
            setSearchResults(results.imageResults);
            setSearchTags(results.imageTags);
            setIsLoadingImages(false);
        } catch (error) {
            console.error("Error in AppContext: "+error);
            setIsLoadingImages(false);
        }
    }

    const resetFocusedImage = ():void => {
        setFocusedImage({ imageURL: "", imageId: "" });
    }

    const handleQuerySearchOfImages = async (query: string)=> {
        try {
            setIsLoadingImages(true);
            const { imageResults } = await searchImages(query);
            setSearchResults(imageResults);
            setIsLoadingImages(false);
        } catch(error) {
            console.error("Error fetching images in AppContext: ", error);
            setIsLoadingImages(false);
        }
    }

    return (
        <AppContext.Provider
            value={{
                isLoadingImages,
                setIsLoadingImages,
                focusedImage,
                setFocusedImage,
                resetFocusedImage,
                searchResults,
                setSearchResults,
                searchTags,
                setSearchTags,
                handleQuerySearchOfImages,
            }}
        >
            {children}
        </AppContext.Provider>
    )
};

export function useAppContext(): AppContextType {
    const context = useContext(AppContext);
    if(!context) {
        throw new Error("useAppContext must be used within AppContext.Provider")
    }
    return context;
}

export default AppProvider;