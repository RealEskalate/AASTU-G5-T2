import 'package:a2svhub/features/auth/domain/usecases/get_my_profile.dart';
import 'package:a2svhub/features/auth/domain/usecases/get_user_profile_by_id.dart';
import 'package:a2svhub/features/auth/domain/usecases/login_user.dart';
import 'package:a2svhub/features/auth/domain/usecases/update_profile.dart';
import 'package:a2svhub/features/auth/presentation/Bloc/auth_event.dart';
import 'package:a2svhub/features/auth/presentation/Bloc/auth_state.dart';
import 'package:flutter_bloc/flutter_bloc.dart';


class AuthBloc extends Bloc<AuthEvent, AuthState> {
  final LoginUser loginUseCase;
  final GetMyProfile getMyProfileUseCase;
  final GetUserProfileById getUserProfileByIdUseCase;
  final UpdateProfile updateProfileUseCase;

  AuthBloc({
    required this.loginUseCase,
    required this.getMyProfileUseCase,
    required this.getUserProfileByIdUseCase,
    required this.updateProfileUseCase,
  }) : super(AuthInitial()) {
    on<LoginEvent>(_onLogin);
    on<GetMyProfileEvent>(_onGetMyProfile);
    on<GetUserProfileByIdEvent>(_onGetUserProfileById);
    on<UpdateProfileEvent>(_onUpdateProfile);
  }

  Future<void> _onLogin(LoginEvent event, Emitter<AuthState> emit) async {
    emit(AuthLoading());
    try {
      final data = await loginUseCase(LoginParams(email: event.email, password: event.password));
      emit(LoginSuccess(data));
    } catch (e) {
      emit(AuthError(e.toString()));
    }
  }

  Future<void> _onGetMyProfile(GetMyProfileEvent event, Emitter<AuthState> emit) async {
  emit(AuthLoading());
  try {
    final profile = await getMyProfileUseCase();
    emit(MyProfileLoaded(profile));
  } catch (e) {
    if (e.toString().contains('Invalid token')) {
      emit(AuthError('Your session has expired. Please log in again.'));
    } else {
      emit(AuthError(e.toString()));
    }
  }
}

  Future<void> _onGetUserProfileById(GetUserProfileByIdEvent event, Emitter<AuthState> emit) async {
    emit(AuthLoading());
    try {
      final user = await getUserProfileByIdUseCase(GetUserProfileByIdParams(id: event.id));
      emit(ProfileLoaded(user));
    } catch (e) {
      emit(AuthError(e.toString()));
    }
  }
Future<void> _onUpdateProfile(UpdateProfileEvent event, Emitter<AuthState> emit) async {
  emit(AuthLoading());
  try {
    final message = await updateProfileUseCase(UpdateProfileParams(
      fields: event.fields,
      photo: event.photo,
    ));
    emit(ProfileUpdated(message));
  } catch (e) {
    if (e.toString().contains('Invalid token')) {
      emit(AuthError('Your session has expired. Please log in again.'));
    } else {
      emit(AuthError(e.toString()));
    }
  }
}
}
