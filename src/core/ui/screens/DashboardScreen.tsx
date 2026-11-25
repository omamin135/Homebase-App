import { Link } from "expo-router";
import { Pressable, View } from "react-native";
import { moduleRegistry } from "../../module-registry";
import { colors, radius, spacing } from "../../theme";
import { AppText } from "../components/AppText";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Screen } from "../components/Screen";
import { useSnackbar } from "../components/snackbar/useSnackbar";

export function DashboardScreen() {
  const { showError, showSuccess } = useSnackbar();

  return (
    <Screen title="Homebase">
      {moduleRegistry.length === 0 ? (
        <Card>
          <AppText variant="sectionHeading">No modules yet</AppText>
          <AppText variant="supporting" tone="secondary">
            Modules register themselves in the module registry and appear here.
          </AppText>
        </Card>
      ) : (
        moduleRegistry.map((m) => {
          const theme = colors.modules[m.theme];
          return (
            <Link key={m.id} href={m.route} asChild>
              <Pressable>
                <Card style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: radius.md,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: theme.container,
                    }}
                  >
                    <View
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: radius.pill,
                        backgroundColor: theme.primary,
                      }}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <AppText variant="sectionHeading">{m.name}</AppText>
                    {m.description ? (
                      <AppText variant="supporting" tone="secondary">
                        {m.description}
                      </AppText>
                    ) : null}
                  </View>
                </Card>
              </Pressable>
            </Link>
          );
        })
      )}

      <Link href="/settings" asChild>
        <Pressable
          style={{ alignItems: "center", paddingVertical: spacing.md }}
        >
          <AppText variant="supporting" tone="secondary">
            Settings and backup
          </AppText>
        </Pressable>
      </Link>

      <Pressable
        onPress={() => {
          throw new Error("error");
        }}
      >
        <AppText>error</AppText>
      </Pressable>

      {/* TEMPORARY: snackbar preview. Remove when done. */}
      <Card>
        <AppText variant="sectionHeading">Snackbar test</AppText>
        <Button
          label="Show error"
          color={colors.semantic.danger.primary}
          onPress={() => showError("Something failed to save. Please try again.")}
        />
        <Button
          label="Show success"
          color={colors.semantic.success.primary}
          onPress={() => showSuccess("Backup exported")}
        />
      </Card>
    </Screen>
  );
}
