import {
	Text,
	View,
	Image,
	ScrollView,
	FlatList,
	ActivityIndicator,
} from "react-native";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import SearchBar from "@/components/SearchBar";

import { useRouter } from "expo-router";
import useFetch from "@/services/usefetch";
import { fetchMovies } from "@/services/api";

export default function Index() {
	// useRouter hook for router to move to diff screen
	const router = useRouter();
	// destructure the data with the call of the useFetch hook with a callback function
	const {
		data: movies,
		loading: moviesLoading,
		error: moviesError,
	} = useFetch(() => fetchMovies({ query: "" }));

	return (
		<View className='flex-1 bg-primary'>
			<Image
				source={images.bg}
				className='absolute w-full z-0'
				resizeMode='cover'
			/>
			<ScrollView
				className='flex-1 px-5'
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
			>
				<Image source={icons.logo} className='w-12 h-10 mt-20 mb-5 mx-auto' />

				<SearchBar
					onPress={() => {
						router.push("/search");
					}}
					placeholder='Search for a movie'
				/>
			</ScrollView>
		</View>
	);
}
