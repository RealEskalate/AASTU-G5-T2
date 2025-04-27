import 'package:a2svhub/core/constants/network/network_info.dart';
import 'package:a2svhub/core/error/exceptions.dart';
import 'package:a2svhub/core/error/failures.dart';
import 'package:a2svhub/features/contests/data/datasource/contestremotedatasource.dart';
import 'package:a2svhub/features/contests/data/model/contestmodel.dart';
import 'package:a2svhub/features/contests/domain/entity/contest.dart';
import 'package:a2svhub/features/contests/domain/repository/contest_repository.dart';
import 'package:a2svhub/features/groups/data/datasource/group_local_data_source.dart';
import 'package:a2svhub/features/groups/data/datasource/group_remote_data_source.dart';
import 'package:a2svhub/features/groups/data/models/group_model.dart';
import 'package:a2svhub/features/groups/domain/entities/group_entity.dart';
import 'package:a2svhub/features/groups/domain/repository/group_repository.dart';
import 'package:dartz/dartz.dart';

class ContestRepositoryImpl extends ContestRepository {
  final ContestRemoteDataSource _contestRemoteDataSource;
  final NetworkInfo _networkInfo;

  ContestRepositoryImpl(
    this._networkInfo,
    this._contestRemoteDataSource,
  );

  @override
  Future<Either<Failure, ContestEntity>> getcontest(int id) async {
    if (await _networkInfo.isConnected) {
      // Network is available, fetch from remote data source
      try {
        final result = await _contestRemoteDataSource.getContest(id);
        return Right(result.toEntity());
      } on ServerException {
        return const Left(ServerFailure("An error has occurred"));
      } on SocketException {
        return const Left(
            ConnectionFailure("Failed to connect to the network"));
      }
    } else {
      return const Left(ConnectionFailure("Failed to connect to the network"));
    }
  }

  @override
  Future<Either<Failure, List<ContestEntity>>> getcontests() async {
    if (await _networkInfo.isConnected) {
      try {
        final products = await _contestRemoteDataSource.getContests();

        return Right(products as List<ContestModel>);
      } on ServerException catch (e) {
        return Left(ServerFailure(e.message));
      }
    } else {
      return const Left(ConnectionFailure("Failed to connect to the network"));
    }
  }
}
