import {
	Platform,
	ImageBackground,
	Image,
	Text,
	View,
	Pressable,
	ScrollView,
} from "react-native";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs, Link, Slot, usePathname } from "expo-router";

const mobileView = Platform.OS !== "web";

// generalized ImgBacgraundComponent with props: any for now
function TabIcon({ focused, icon, title }: any) {
	if (focused) {
		return (
			<ImageBackground
				source={images.highlight}
				className='flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden'
			>
				<Image source={icon} tintColor='#151312' className='size-5' />
				<Text className='text-secondary text-base font-semibold ml-2'>
					{title}
				</Text>
			</ImageBackground>
		);
	}

	return (
		<View className='size-full justify-center items-center mt-4 rounded-full'>
			<Image source={icon} tintColor='#A8B5DB' className='size-5' />
		</View>
	);
}

/** ---------- WEB-ONLY LAYOUT (Top Navbar) ---------- */
function WebLayout() {
	const pathname = usePathname();

	const items = [
		{ href: "/", title: "Home", icon: icons.home },
		{ href: "/search", title: "Search", icon: icons.search },
		{ href: "/saved", title: "Saved", icon: icons.save },
		{ href: "/profile", title: "Profile", icon: icons.person },
	];

	const isActive = (href: string) =>
		href === "/" ? pathname === "/" : pathname.startsWith(href);

	return (
		// Full viewport height so ScrollView can fill & scroll
		<View className='relative bg-[#0B0920]' style={{ height: "100vh" }}>
			{/* Sticky navbar (content centered using max-w + mx-auto) */}
			<View className='sticky top-0 z-50 bg-[#0F0D23]/80 backdrop-blur-md'>
				<View className='max-w-6xl mx-auto px-4 py-3 flex items-start justify-between'>
					<View className='flex-row items-center justify-center gap-3'>
						{items.map((item) => {
							const active = isActive(item.href);
							return (
								<Link key={item.href} href={item.href} asChild>
									<Pressable
										className={`rounded-full px-3 py-3 ${
											active ? "bg-white/10" : ""
										}`}
									>
										<View className='flex-row items-center gap-3'>
											<Image source={item.icon} className='size-5' />
											<Text
												className={`text-sm font-semibold ${
													active ? "text-white" : "text-[#A8B5DB]"
												}`}
											>
												{item.title}
											</Text>
										</View>
									</Pressable>
								</Link>
							);
						})}
					</View>
				</View>
			</View>

			{/* Scrollable page; inner content is centered with max-w + mx-auto */}
			<ScrollView
				style={{ flex: 1, overflow: "auto" }}
				contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 24 }}
				showsVerticalScrollIndicator={false}
			>
				<View className='max-w-6xl mx-auto w-full'>
					<Slot />
				</View>
			</ScrollView>
		</View>
	);
}

function MobileLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarItemStyle: {
					width: "100%",
					height: "100%",
					justifyContent: "center",
					alignItems: "center",
				},
				tabBarStyle: {
					backgroundColor: "#0F0D23",
					borderRadius: 50,
					marginHorizontal: 20,
					marginBottom: 36,
					height: 52,
					position: "absolute",
					overflow: "hidden",
					borderWidth: 1,
					borderColor: "#0F0D23",
				},
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					title: "Home",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} icon={icons.home} title='Home' />
					),
				}}
			/>
			<Tabs.Screen
				name='search'
				options={{
					title: "Search",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} icon={icons.search} title='Search' />
					),
				}}
			/>
			<Tabs.Screen
				name='saved'
				options={{
					title: "Saved",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} icon={icons.save} title='Saved' />
					),
				}}
			/>
			<Tabs.Screen
				name='profile'
				options={{
					title: "Profile",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} icon={icons.person} title='Profile' />
					),
				}}
			/>
		</Tabs>
	);
}

const _layout = () => {
	return <>{mobileView ? <MobileLayout /> : <WebLayout />}</>;
};

export default _layout;
