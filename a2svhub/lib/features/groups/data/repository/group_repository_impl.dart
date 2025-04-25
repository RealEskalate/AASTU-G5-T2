import 'package:a2svhub/core/constants/network/network_info.dart';
import 'package:a2svhub/core/error/exceptions.dart';
import 'package:a2svhub/core/error/failures.dart';
import 'package:a2svhub/features/groups/data/datasource/group_local_data_source.dart';
import 'package:a2svhub/features/groups/data/datasource/group_remote_data_source.dart';
import 'package:a2svhub/features/groups/data/models/group_model.dart';
import 'package:a2svhub/features/groups/domain/entities/group_entity.dart';
import 'package:a2svhub/features/groups/domain/repository/group_repository.dart';
import 'package:dartz/dartz.dart';

class GroupRepositoryImpl extends GroupRepository {
  final GroupRemoteDataSource _groupRemoteDataSource;
  final GroupLocalDataSource _groupLocalDataSource;
  final NetworkInfo _networkInfo;

  GroupRepositoryImpl(
    this._networkInfo,
    this._groupRemoteDataSource,
    this._groupLocalDataSource,
  );

   @override
  Future<Either<Failure, GroupEntity>> getgroup(String id) async {
    if (await _networkInfo.isConnected) {
      // Network is available, fetch from remote data source
      try {
        final result = await _groupRemoteDataSource.getGroup(id);
        return Right(result.toEntity());
      } on ServerException {
        return const Left(ServerFailure("An error has occurred"));
      } on SocketException {
        return const Left(
            ConnectionFailure("Failed to connect to the network"));
      }
    } else {
      // No network, fetch from local data source
      try {
        final result = await _groupLocalDataSource.getGroup(id);
        return Right(result.toEntity());
      } on CacheException {
        return const Left(CacheFailure("No cached data available"));
      }
    }
  }

  @override
  Future<Either<Failure, List<GroupEntity>>> getgroups() async {
    if (await _networkInfo.isConnected) {
      try {
        final products = await _groupRemoteDataSource.getGroups();
        await _groupLocalDataSource.cacheGroups(products);
        return Right(products as List<GroupModel>);
      } on ServerException catch (e) {
        return Left(ServerFailure(e.message));
      }
    } else {
      try {
        final products =
            await _groupLocalDataSource.getGroups(); // Await the future
        return Right(products);
      } on CacheException catch (e) {
        return Left(CacheFailure(e.message));
      }
    }
  }
}
