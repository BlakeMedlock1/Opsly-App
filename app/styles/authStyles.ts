import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#27374D',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoCircle: {
    width: 48,
    height: 48,
    backgroundColor: '#2dd4bf',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 32,
  },
  toggleText: {
    fontSize: 18,
    fontWeight: '600',
  },
  active: {
    color: '#fff',
  },
  inactive: {
    color: '#9CA3AF',
  },
  form: {
    width: '100%',
    maxWidth: 320,
  },
  input: {
    backgroundColor: '#fff',
    color: '#000',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  forgotPassword: {
    color: '#fff',
    textAlign: 'right',
    textDecorationLine: 'underline',
    fontSize: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#2dd4bf',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  errorText: {
    color: '#f87171',
    textAlign: 'center',
    marginTop: 16,
  },
});
