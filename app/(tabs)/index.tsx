import {
	Text,
	View,
	Image,
	ScrollView,
	FlatList,
	ActivityIndicator,
	Platform,
	Dimensions,
} from "react-native";
import { useEffect, useState } from "react";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import SearchBar from "@/components/SearchBar";

import { useRouter } from "expo-router";
import useFetch from "@/services/usefetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "../../components/MovieCard";

function useNumColumns() {
	const [cols, setCols] = useState(3);

	useEffect(() => {
		const update = () => {
			const { width } = Dimensions.get("window");
			const isWeb = Platform.OS === "web";
			if (isWeb) {
				if (width >= 997) setCols(6);
				else if (width >= 859) setCols(5);
				else if (width >= 648) setCols(4);
				else setCols(3);
			}
			// else {
			// 	// simple native breakpoints (swap for expo-device if you prefer)
			// 	if (width >= 1024) setCols(6);
			// 	else if (width >= 768) setCols(4);
			// 	else setCols(3);
			// }
		};
		update();
		const sub = Dimensions.addEventListener("change", update);
		return () => sub?.remove?.();
	}, []);

	return cols;
}

export default function Index() {
	// useRouter hook for router to move to diff screen
	const router = useRouter();
	const numColumns = useNumColumns();
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

				{moviesLoading ? (
					<ActivityIndicator
						size='large'
						color='#0000ff'
						className='mt-10 self-center'
					/>
				) : moviesError ? (
					<Text>Error: {moviesError?.message}</Text>
				) : (
					<View className='flex-1 mt-5'>
						<SearchBar
							onPress={() => {
								router.push("/search");
							}}
							placeholder='Search for a movie'
						/>
						<>
							<Text className='text-lg text-white font-bold mt-5 mb-3'>
								Latest Movies
							</Text>
							<FlatList
								key={`grid-${numColumns}`} // 👈 forces remount when columns change
								data={movies}
								renderItem={({ item }) => <MovieCard {...item} />}
								keyExtractor={(item) => item.id.toString()}
								numColumns={numColumns}
								columnWrapperStyle={{
									justifyContent: "center", // 👈 center the row
									alignItems: "center",
									gap: 20,
									paddingRight: 5,
									marginBottom: 10,
								}}
								className='mt-2 pb-32'
								scrollEnabled={false}
							/>
						</>
					</View>
				)}
			</ScrollView>
		</View>
	);
}
