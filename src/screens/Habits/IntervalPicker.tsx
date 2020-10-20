import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Icon, CheckBox, Text } from "react-native-elements";
import { AllDays, Day } from "store";
import { fonts } from "styles/fonts";
import { colorTheme } from "styles/theme";

type IProps = {
    selectedDays: Day[];
    setSelectedDays: (days: Day[]) => void;
    toggleModal: () => void;
};

export function IntervalPicker({ selectedDays, setSelectedDays, toggleModal }: IProps) {
    const toggleDay = (day: Day) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter((d) => d === day));
        } else {
            setSelectedDays(selectedDays.concat(day));
        }
    };

    const toggleSelectAllDays = () => {
        if (selectedDays.length !== 7) {
            setSelectedDays(AllDays);
        } else {
            setSelectedDays([]);
        }
    };

    return (
        <View style={styles.intervalPicker}>
            <View style={styles.intervalPickerEverydayOption}>
                <Text style={styles.intervalPickerEverydayOptionText}>Repeat every day:</Text>
                <CheckBox
                    onPress={toggleSelectAllDays}
                    checked={selectedDays.length === 7}
                    containerStyle={{ margin: 0, padding: 0 }}
                    checkedIcon={<Icon name="checkbox" type="ionicon" color={colorTheme.primary} />}
                />
            </View>

            <View style={styles.intervalDayPicker}>
                {AllDays.map((day, idx) => {
                    const isSelected = selectedDays.includes(day);

                    return (
                        <TouchableOpacity key={idx} onPress={() => toggleDay(day)}>
                            <View
                                style={[
                                    styles.intervalDay,
                                    isSelected ? styles.intervalSelectedDay : null,
                                ]}
                            >
                                <Text style={isSelected ? styles.intervalSelectedDayText : {}}>
                                    {day[0]}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <Text onPress={toggleModal} style={styles.intervalDoneText}>
                Done
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    intervalPicker: {
        backgroundColor: colorTheme.background,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 15,
        paddingBottom: 15,
        paddingVertical: 20,
    },

    intervalPickerEverydayOption: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 25,
    },

    intervalPickerEverydayOptionText: {
        ...fonts.semiBold,
    },

    intervalDayPicker: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    intervalDay: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderColor: colorTheme.grey2,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    intervalSelectedDay: {
        borderWidth: 0,
        backgroundColor: colorTheme.primary,
    },

    intervalSelectedDayText: {
        color: colorTheme.white,
    },

    intervalDoneText: {
        ...fonts.semiBold,
        color: colorTheme.primary,
        marginTop: 25,
    },
});
