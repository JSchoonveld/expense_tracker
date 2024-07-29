import {StyleSheet, View, Pressable, Text, StyleProp, ViewStyle, Platform} from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function MyButton({ label, addedStyles, onPress }: { label: string, addedStyles?: StyleProp<ViewStyle>, onPress: () => void }) {
        return (
            <View
                style={[styles.buttonContainer]}
            >
                <Pressable
                    android_ripple={{color: '#ccc'}}
                    style={({pressed}) => [styles.button, addedStyles, pressed ? styles.buttonPressed : null]}
                    onPress={onPress}
                >
                    <Text style={styles.buttonLabel}>{label}</Text>
                </Pressable>
            </View>
        );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 110,
        height: 40,
        marginHorizontal: 8,
        borderRadius: 5,
        overflow: Platform.select({android: 'hidden', ios: 'visible'}),
    },
    button: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 16,
    },
    buttonPressed: {
        backgroundColor: '#f0f0f0',
        opacity: 0.5,
    },
});
