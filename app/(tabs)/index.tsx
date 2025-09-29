import { Text, View } from "react-native";

export default function Index() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text className='text-3xl text-dark-200 font-bold underline text-center'>
				Welcome
			</Text>
		</View>
	);
}
