import 'package:equatable/equatable.dart';

class ServerException extends Equatable implements Exception {
  final String message;

  const ServerException(this.message);

  @override
  List<Object?> get props => [message];
}

class SocketException extends Equatable implements Exception {
  final String message;

  const SocketException(this.message);

  @override
  List<Object?> get props => [message];
}

class CacheException extends Equatable implements Exception {
  final String message;

  const CacheException(this.message);

  @override
  List<Object?> get props => [message];
}
