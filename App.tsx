import * as Sentry from '@sentry/react-native';
import { Button, StatusBar, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

Sentry.init({
  dsn: import.meta.env.ROLLIPOP_SENTRY_DSN,
});

function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.title}>Rollipop Sentry Test</Text>
        <Text>App.tsx에서 시작하세요.</Text>
        <Button
          title="error button"
          onPress={() => {
            throw new Error('20260927 error');
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
  },
});

export default Sentry.wrap(App);
