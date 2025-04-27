import 'package:equatable/equatable.dart';
import '../../domain/entities/user_entity.dart';

abstract class AuthState extends Equatable {
  @override
  List<Object?> get props => [];
}

class AuthInitial extends AuthState {}

class AuthLoading extends AuthState {}

class LoginSuccess extends AuthState {
  final Map<String, dynamic> data;

  LoginSuccess(this.data);

  @override
  List<Object?> get props => [data];
}

class ProfileLoaded extends AuthState {
  final UserEntity user;

  ProfileLoaded(this.user);

  @override
  List<Object?> get props => [user];
}

class ProfileUpdated extends AuthState {
  final String message;

  ProfileUpdated(this.message);

  @override
  List<Object?> get props => [message];
}

class AuthError extends AuthState {
  final String message;

  AuthError(this.message);

  @override
  List<Object?> get props => [message];
}

class MyProfileLoaded extends AuthState {
  final UserEntity user;

  MyProfileLoaded(this.user);
}