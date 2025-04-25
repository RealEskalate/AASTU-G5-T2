import 'package:a2svhub/core/constants/network/network_info.dart';
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
  sl.registerLazySingleton<GroupLocalDataSource>(
      () => GroupLocalDataSourceImpl(sharedpreferences: sharedPreferences));
  sl.registerLazySingleton<GroupRepositoryImpl>(() => GroupRepositoryImpl(
        sl<NetworkInfo>(),
        sl<GroupRemoteDataSource>(),
        sl<GroupLocalDataSource>(),
      ));
  sl.registerLazySingleton<GetGroupsUseCase>(
      () => GetGroupsUseCase(sl<GroupRepositoryImpl>()));
  sl.registerFactory(
      () => GroupPageBloc(getgroupsUseCase: sl<GetGroupsUseCase>())); 
}
