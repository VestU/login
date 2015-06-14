import os
import gzip
import shutil
from shutil import copytree, ignore_patterns
import subprocess

BUILD_PATH = './deploy'

def process( directory ):

    for dirpath , dnames , fnames in os.walk( directory ):
        for f in fnames:
            if f.endswith( '.gz' ):
                #print( 'Delete:' + f )
                os.remove( dirpath + os.sep + f )

    for dirpath , dnames , fnames in os.walk( directory ):
        for f in fnames:
            if f.startswith( '.' ):
                #print( 'ignore:' + dirpath + os.sep + f )
                continue
            #print( 'gzip:' + dirpath + os.sep + f )
            file_input = open( dirpath + os.sep + f , 'rb')
            file_output = gzip.open( dirpath + os.sep + f + '.gz', 'wb')
            file_output.writelines( file_input )
            file_output.close()
            file_input.close()

#paths to process
def deploy():
    print( 'INFO: Start Deployment' )
    if os.path.exists( BUILD_PATH ):
        shutil.rmtree( BUILD_PATH )
    print( 'INFO: Copy files' )
    copytree( './' , BUILD_PATH , ignore=ignore_patterns( '*.py' , '*.md' , 'LICENSE' , '.settings*' , '.git*' ) )
    print( 'INFO: gzip optimize' )
    process( BUILD_PATH + '/static' )
    os.chdir( BUILD_PATH )
    print( 'INFO: EB Deployment' )
    status = subprocess.call( "eb" + " deploy" , shell=True )
    os.chdir( '../' )
    print( 'INFO: Cleanup' )
    shutil.rmtree( BUILD_PATH )
    print( 'INFO: Deployment Complete' )


deploy()