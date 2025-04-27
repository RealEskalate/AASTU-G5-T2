import 'package:a2svhub/core/constants/network/network_info.dart';
import 'package:a2svhub/features/auth/data/datasources/auth_remote_datasource.dart';
import 'package:a2svhub/features/auth/data/datasources/auth_remote_datasource_impl.dart';
import 'package:a2svhub/features/auth/data/repositories/auth_repository_impl.dart';
import 'package:a2svhub/features/auth/domain/repositories/auth_repository.dart';
import 'package:a2svhub/features/auth/domain/usecases/get_my_profile.dart';
import 'package:a2svhub/features/auth/domain/usecases/get_user_profile_by_id.dart';
import 'package:a2svhub/features/auth/domain/usecases/login_user.dart';
import 'package:a2svhub/features/auth/domain/usecases/update_profile.dart';
import 'package:a2svhub/features/auth/presentation/Bloc/auth_bloc.dart';
import 'package:a2svhub/features/contests/data/datasource/contestremotedatasource.dart';
import 'package:a2svhub/features/contests/data/repository/contestrepoimpl.dart';
import 'package:a2svhub/features/contests/domain/repository/contest_repository.dart';
import 'package:a2svhub/features/contests/domain/usecase/getcontestsusecase.dart';
import 'package:a2svhub/features/contests/presentation/bloc/contestpagebloc.dart';
import 'package:a2svhub/features/groups/data/datasource/group_local_data_source.dart';
import 'package:a2svhub/features/groups/data/repository/group_repository_impl.dart';
import 'package:a2svhub/features/groups/presentation/bloc/group_page_bloc.dart';
import 'package:get_it/get_it.dart';
import 'package:http/http.dart' as http;

import 'package:a2svhub/features/groups/data/datasource/group_remote_data_source.dart';

import 'package:a2svhub/features/groups/domain/usecase/get_groupsusecase.dart';
import 'package:internet_connection_checker/internet_connection_checker.dart';
import 'package:shared_preferences/shared_preferences.dart';

final GetIt sl = GetIt.instance; // This is the correct way to initialize GetIt.
Future<void> setupLocator() async {
  var client = http.Client();
  final internetChecker = InternetConnectionChecker.createInstance();

  sl.registerLazySingleton(() => internetChecker);

  var sharedPreferences = await SharedPreferences.getInstance();
  sl.registerFactory<NetworkInfo>(() => NetworkInfoImpl(internetChecker));
  sl.registerLazySingleton<http.Client>(() => client);

  sl.registerLazySingleton<GroupRemoteDataSource>(
      () => GroupRemoteDataSourceImpl(client: client));
  sl.registerLazySingleton<AuthRemoteDataSource>(
    () => AuthRemoteDataSourceImpl(client: sl()),
  );
  sl.registerLazySingleton<GroupLocalDataSource>(
      () => GroupLocalDataSourceImpl(sharedpreferences: sharedPreferences));
  sl.registerLazySingleton<GroupRepositoryImpl>(() => GroupRepositoryImpl(
        sl<NetworkInfo>(),
        sl<GroupRemoteDataSource>(),
        sl<GroupLocalDataSource>(),
      ));
  sl.registerLazySingleton<AuthRepository>(
    () => AuthRepositoryImpl(remoteDataSource: sl()),
  );
  sl.registerLazySingleton<GetGroupsUseCase>(
      () => GetGroupsUseCase(sl<GroupRepositoryImpl>()));
  sl.registerFactory(
      () => GroupPageBloc(getgroupsUseCase: sl<GetGroupsUseCase>()));

  sl.registerLazySingleton(() => LoginUser(sl()));
  sl.registerLazySingleton(() => UpdateProfile(sl()));
  sl.registerLazySingleton(() => GetMyProfile(sl()));
  sl.registerLazySingleton(() => GetUserProfileById(sl()));
  sl.registerFactory(() => AuthBloc(
        loginUseCase: sl(),
        getMyProfileUseCase: sl(),
        getUserProfileByIdUseCase: sl(),
        updateProfileUseCase: sl(),
      ));
  sl.registerLazySingleton<ContestRemoteDataSource>(
    () => ContestRemoteDataSourceImpl(client: sl()),
  );
  sl.registerLazySingleton<ContestRepository>(
    () => ContestRepositoryImpl(
      sl<NetworkInfo>(),
      sl<ContestRemoteDataSource>(),
    ),
  );
  sl.registerLazySingleton<GetContestsUseCase>(
    () => GetContestsUseCase(sl<ContestRepository>()),
  );
  sl.registerFactory<ContestBloc>(
    () => ContestBloc(sl<GetContestsUseCase>()),
  );
}
