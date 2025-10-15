import { Pressable, Text } from "react-native";

export default function PressableButton( {title, color, handlePress, borderRadius, width, ...rest} ) {
    return (
        <Pressable onPress={handlePress} {...rest} style={({pressed}) => [{
            height: 32,
            padding: 6,
            backgroundColor: color,
            opacity: pressed ? 0.6 : 1,
            borderRadius: borderRadius,
            alignItems: "center",
            justifyContent: "center",
            width: width,
        }]}>
            <Text>{title}</Text>
        </Pressable> 
    );
}