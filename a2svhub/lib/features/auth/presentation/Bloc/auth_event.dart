import 'dart:io';

import 'package:equatable/equatable.dart';

abstract class AuthEvent extends Equatable {
  @override
  List<Object?> get props => [];
}

class LoginEvent extends AuthEvent {
  final String email;
  final String password;

  LoginEvent(this.email, this.password);

  @override
  List<Object?> get props => [email, password];
}

class GetMyProfileEvent extends AuthEvent {}

class GetUserProfileByIdEvent extends AuthEvent {
  final int id;

  GetUserProfileByIdEvent(this.id);

  @override
  List<Object?> get props => [id];
}

class UpdateProfileEvent extends AuthEvent {
  final Map<String, String> fields;
  final File? photo;

  UpdateProfileEvent({required this.fields, this.photo});
}

