import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface CustomAlertProps {
    visible: boolean;
    title: string;
    message: string;
    onClose: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ visible, title, message, onClose }) => {
    return (
        <Modal transparent animationType="fade" visible={visible}>
            <View style={styles.overlay}>
                <View style={styles.alertBox}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>
                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>확인</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    alertBox: {
        backgroundColor: "#fff",
        padding: 24,
        borderRadius: 16,
        width: 280,
        alignItems: "center",
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#FF5659",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default CustomAlert;
